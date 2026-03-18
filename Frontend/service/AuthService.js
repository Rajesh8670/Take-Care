const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

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
        return {
  status,
  email: data.email || "",
  message: mapServerOtpResponse(data).message,
};
    } catch (error) {
        console.error("Error fetching OTP:", error);
        throw new Error("Cannot reach backend server. Check that frontend and backend are using the same local API URL.");
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
        throw new Error("Cannot verify OTP because the backend server is not reachable.");
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
    const status = response.status;
    const resData = await response.json();

    return { status, message: resData.message, data: resData };
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Cannot create account because the backend server is not reachable.");
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
    return {
      status,
      message: data.message,
      session: data.session,
      user: data.user,
      token: data.token,
    };

  } catch (error) {
    console.error("Error in login:", error);
    return { status: 500, message: "Cannot reach backend server" };
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
       return {
  status,
  message:data.message,
};
    } catch (error) {
        console.error("Error fetching OTP:", error);
        throw new Error("Cannot reset password because the backend server is not reachable.");
    }
};



const mapServerOtpResponse = (serverResponse) => {
    return {
        email: serverResponse.email || "",
        isVerified: serverResponse.isVerified || false,    
        message: serverResponse.message || "No message",
    };
};
