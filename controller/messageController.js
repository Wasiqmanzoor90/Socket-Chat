import Message from "../model/message.js";




export const createMessage = async (req, res)=>{
    const {senderId, room, content} = req.body;
    try {
    const message = new Message({
        sender: senderId,
        room,
        content,
    });
    const saveMessage = await message.save();
    const PopulateMessage = await saveMessage.populate("sender", "name email");
     res.status(201).json(PopulateMessage);
    } catch (error) {
         res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
}


export const getRoomMessages = async (req, res) => {

    const {roomId} = req.params;
    try {
        const message = await Message.find({ room: roomId })
            .populate("sender", "name email")
            .sort({ timeStamp: 1 });
             res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
    }
}



// In controller
export const getLatestMessages = async (req, res) => {
  const currentUserId = req.params.userId;

  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: currentUserId },
            { receiver: currentUserId },
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", currentUserId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" }
        }
      }
    ]);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch latest messages" });
  }
};
