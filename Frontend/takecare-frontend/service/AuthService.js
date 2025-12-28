const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getOtpFromServer = async ({email,page}) => {
    try {
        const response = await fetch(`${BASE_URL}/api/takeCare/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,page }),
        });

         const status = response.status;
        const data = await response.json();
        console.log("request sent with:", data);
       return {
  status,
  message: mapServerOtpResponse(data).message,
};
    } catch (error) {
        console.error("Error fetching OTP:", error);
        throw error;
    }
};

export const checkOtpWithServer = async ({ userOtp, email }) => {
    try {
        const response = await fetch(`${BASE_URL}/api/takeCare/check-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userOtp, email }),
        });
        const data = await response.json();

        return mapServerOtpResponse(data);
    } catch (error) {
        console.error("Error checking OTP:", error);
        throw error;
    }
};

export const CreateAccountInServer = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/takeCare/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("request sent with:", data);
    const status = response.status;
    const resData = await response.json();
    console.log("Response status:", status, "Data:", resData);

    return { status, message: resData.message, data: resData };
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const loginToServer = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/takeCare/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const status = response.status;
    const data = await response.json();
    console.log(data);
    return {
      status,
      message: data.message,
      session: data.session,
      user: data.user,
      token: data.token,
    };

  } catch (error) {
    console.error("Error in login:", error);
    return { status: 500, message: "Server error" };
  }
};

export const resetPassword = async ({email,password}) => {
    try {
        const response = await fetch(`${BASE_URL}/api/takeCare/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password }),
        });

         const status = response.status;
        const data = await response.json();
        console.log("request sent with:", data);
       return {
  status,
  message:data.message,
};
    } catch (error) {
        console.error("Error fetching OTP:", error);
        throw error;
    }
};



const mapServerOtpResponse = (serverResponse) => {
    return {
        email: serverResponse.email || "",
        isVerified: serverResponse.isVerified || false,    
        message: serverResponse.message || "No message",
    };
};
