import jwt from "jsonwebtoken";

const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-secret-key";

/**
 * Verify admin credentials
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
export const verifyAdminCredentials = (username, password) => {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  return username === adminUsername && password === adminPassword;
};

/**
 * Generate JWT token
 * @param {Object} payload
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, SESSION_SECRET, { expiresIn: "24h" });
};

/**
 * Verify JWT token
 * @param {string} token
 * @returns {Object|null} Decoded token or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SESSION_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Middleware to check if user is authenticated (for API routes)
 * @param {Request} request
 * @returns {boolean}
 */
export const isAuthenticated = (request) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    return decoded !== null;
  } catch (error) {
    return false;
  }
};
