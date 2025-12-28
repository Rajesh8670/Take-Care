import { useState, useEffect, useContext, useRef } from "react";
import { Upload, FileText, Brain, Loader2, ChevronDown, ChevronUp, Shield, BarChart, Heart, Home, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const HealthReports = () => {
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null); // For the main card focus
  const [expandedReport, setExpandedReport] = useState(null); // For the details section within a card
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const activeCardRef = useRef(null);
  const analysisResultRef = useRef(null);

  // Click outside to collapse the active card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeCardRef.current && !activeCardRef.current.contains(event.target)) {
        setActiveReport(null);
        setExpandedReport(null); // Also collapse details
      }
    };
    if (activeReport) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeReport]);

  // Click outside to collapse the analysis details (summary view)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (analysisResultRef.current && !analysisResultRef.current.contains(event.target)) {
        setExpandedReport(null);
      }
    };
    if (expandedReport) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedReport]);


  useEffect(() => {
    const fetchReports = async () => {
      if (!token) {
        logout();
        navigate('/login');
        return;
      };
      try {
        const response = await fetch(`${BASE_URL}/api/takeCare/reports`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else if (response.status === 401) {
          logout();
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [token, logout, navigate]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("report", file);

    try {
      const response = await fetch(`${BASE_URL}/api/takeCare/upload-report`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newReport = await response.json();
        setReports((prev) => [newReport.report, ...prev]);
        setActiveReport(newReport.report._id); // Auto-focus the new upload
      } else if (response.status === 401) {
        logout();
        navigate('/login');
      } else {
        console.error("Error uploading report");
      }
    } catch (error) {
      console.error("Error uploading report:", error);
    }
  };

  const analyzeReport = (id) => {
    setReports((prev) =>
      prev.map((report) =>
        report._id === id
          ? { ...report, analyzing: true }
          : report
      )
    );

    setTimeout(() => {
      setReports((prev) =>
        prev.map((report) =>
          report._id === id
            ? {
                ...report,
                analyzing: false,
                result: {
                  summary:
                    "Mild vitamin D deficiency detected with slightly elevated cholesterol levels. Overall health assessment shows good cardiovascular health markers.",
                  condition:
                    "No critical abnormalities found. Preventive care advised for maintaining optimal health levels.",
                  recommendations: [
                    "Increase sunlight exposure (15-20 minutes daily)",
                    "Balanced low-fat diet with omega-3 fatty acids",
                    "Regular exercise (30 minutes, 5 times a week)",
                    "Follow-up test after 3 months",
                    "Consider Vitamin D supplements (consult doctor)",
                    "Monitor cholesterol levels quarterly"
                  ],
                  confidence: "92%",
                  insights: [
                    "Vitamin D levels: 18 ng/mL (below optimal)",
                    "Cholesterol: 210 mg/dL (borderline high)",
                    "Blood Pressure: Normal range",
                    "Glucose Levels: Within normal limits"
                  ]
                },
              }
            : report
        )
      );
    }, 2500);
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/takeCare/reports/${reportId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
      } else {
        const data = await response.json();
        console.error("Failed to delete report:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("An error occurred while deleting the report.");
    }
  };

  const toggleExpand = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-blue-200 text-white  px-4 py-12 sm:px-6 lg:px-8">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <button
        onClick={goToHome}
        className="fixed top-6 left-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group border border-gray-200"
      >
        <Home className="w-4 h-4 text-teal-600 group-hover:text-teal-700 transition-colors" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Home</span>
      </button>

      <div className="relative max-w-6xl mx-auto">
        
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Secure & HIPAA Compliant</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Reports
            <span className="block text-3xl md:text-4xl font-normal bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mt-2">
              AI-Powered Analysis
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your medical reports for instant AI analysis. Get detailed insights, 
            condition assessment, and personalized recommendations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-black">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>100% Secure Upload</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Personalized Recommendations</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-blue-100 rounded-3xl shadow-2xl border border-gray-100 ">
              <label className="flex flex-col items-center justify-center border-3 border-dashed border-teal-200/50 rounded-2xl p-12 cursor-pointer hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-blue-50/50 transition-all duration-300 group">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-30"></div>
                  <Upload className="relative w-16 h-16 text-white p-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full shadow-lg" />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Upload Health Report
                </p>
                <p className="text-gray-500 mb-6 max-w-md text-center">
                  Drag & drop or click to upload PDF, JPG, or PNG files. 
                  Your documents are encrypted and processed securely.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-blue-700 transition-all duration-300">
                  <Upload className="w-4 h-4" />
                  Choose File
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200/50">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No reports uploaded yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Upload your first health report to get AI-powered insights and recommendations.
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <div key={report._id}>
                {activeReport === report._id ? (
                  // Active, Full Card View
                  <div
                    ref={activeCardRef}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 relative"
                  >
                    <button 
                      onClick={() => handleDeleteReport(report._id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    {/* Report Header */}
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div 
                          className="flex items-start gap-4 cursor-pointer"
                          onClick={() => window.open(`${BASE_URL}${report.fileUrl}`, '_blank')}
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-teal-100 rounded-xl blur-sm"></div>
                            <FileText className="relative w-12 h-12 text-teal-600 p-2.5 bg-white rounded-xl shadow" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-bold text-gray-900 text-lg">
                                {report.fileName}
                              </p>
                              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                                {report.fileType.split('/')[1].toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                Uploaded {new Date(report.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => analyzeReport(report._id)}
                          disabled={report.analyzing || report.result}
                          className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:from-teal-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          {report.analyzing ? ( <> <Loader2 className="relative w-5 h-5 animate-spin" /> <span className="relative">Analyzing...</span> </> ) 
                          : report.result ? ( <> <Brain className="relative w-5 h-5" /> <span className="relative">Analysis Complete</span> </> ) 
                          : ( <> <Brain className="relative w-5 h-5" /> <span className="relative">Analyze with AI</span> </>)}
                        </button>
                      </div>
                    </div>

                    {/* Analysis Result */}
                    {report.result && (
                      <div 
                        ref={report._id === expandedReport ? analysisResultRef : null}
                        className={`border-t border-gray-100 transition-all duration-500 ${expandedReport === report._id ? 'max-h-[2000px]' : 'max-h-96'} overflow-hidden`}
                      >
                        <div className="p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg">
                                <BarChart className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent">
                                  AI Analysis Results
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Confidence score: <span className="font-bold text-teal-600">{report.result.confidence}</span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleExpand(report._id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              {expandedReport === report._id ? ( <> <ChevronUp className="w-4 h-4" /> Show Less </> ) 
                              : ( <> <ChevronDown className="w-4 h-4" /> Show More Details </> )}
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 border border-teal-100">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-teal-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-teal-600" />
                                  </div>
                                  <h4 className="font-bold text-gray-900">Summary</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  {report.result.summary}
                                </p>
                              </div>
                              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <Heart className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <h4 className="font-bold text-gray-900">Condition Assessment</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  {report.result.condition}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-6">
                              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-purple-100 rounded-lg">
                                    <Brain className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <h4 className="font-bold text-gray-900">Recommendations</h4>
                                </div>
                                <ul className="space-y-3">
                                  {report.result.recommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                      <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs font-bold rounded-full mt-0.5">
                                        {i + 1}
                                      </div>
                                      <span className="text-gray-700">{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {expandedReport === report._id && report.result.insights && (
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                      <BarChart className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900">Detailed Insights</h4>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {report.result.insights.map((insight, i) => (
                                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-sm text-gray-600">{insight}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {expandedReport === report._id && (
                            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
                              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
                                Download Full Report
                              </button>
                              <button className="px-6 py-3 bg-white text-teal-600 font-medium rounded-xl border-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300">
                                Schedule Follow-up
                              </button>
                              <button className="px-6 py-3 bg-white text-gray-600 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                                Share with Doctor
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Collapsed, Line-Item View
                  <div
                    onClick={() => { setActiveReport(report._id); setExpandedReport(null); }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer flex items-center gap-4"
                  >
                    <FileText className="w-6 h-6 text-teal-600 flex-shrink-0" />
                    <p className="font-medium text-gray-800 truncate">
                      {report.fileName}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">24/7</div>
              <p className="text-gray-600">AI Analysis Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">99.9%</div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">256-bit</div>
              <p className="text-gray-600">Encryption Security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReports;