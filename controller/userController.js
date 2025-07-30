import User from "../model/user.js";

export const AllUser = async (req, res) => {
  try {
    // Only select name and email fields
    const users = await User.find().select("name email");
    
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
