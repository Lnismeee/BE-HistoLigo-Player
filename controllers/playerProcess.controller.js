import PlayerProcess from "../models/playerProcess.model.js";

export const createPlayerProcess = async (req, res) => {
  const { playerId, countryId, topics } = req.body;

  try {
    const existingPlayerProcess = await PlayerProcess.findOne({
      playerId,
    });
    if (existingPlayerProcess) {
      return res.status(400).json({ message: "PlayerProcess already exists" });
    }
    const newPlayerProcess = new PlayerProcess({
      playerId,
      countryId,
      topics,
    });

    const savedPlayerProcess = await newPlayerProcess.save();
    res.status(201).json({
      message: "PlayerProcess created successfully",
      savedPlayerProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating player process", error });
  }
};

export const getPlayerProcessById = async (req, res) => {
  const id = req.params;
  try {
    const playerProcess = await PlayerProcess.findById(id).populate(
      "countryId"
    );

    if (!playerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    res.status(200).json(playerProcess);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player process", error });
  }
};

export const updatePlayerProcessById = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerId, countryId, topics } = req.body;
    const existingPlayerProcess = await PlayerProcess.findOne({
      playerId,
    });
    if (existingPlayerProcess) {
      return res.status(400).json({ message: "PlayerId already exists" });
    }
    const updatedPlayerProcess = await PlayerProcess.findByIdAndUpdate(
      id,
      { playerId, countryId, topics },
      { new: true }
    );

    if (!updatedPlayerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    res.status(200).json({
      message: "PlayerProcess updated successfully",
      updatedPlayerProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating player process", error });
  }
};

export const deletePlayerProcessById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlayerProcess = await PlayerProcess.findByIdAndDelete(id);

    if (!deletedPlayerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    res.status(200).json({ message: "Player process deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player process", error });
  }
};

export const getAllPlayerProcesses = async (req, res) => {
    try {
      const playerId = req.user._id;
  
      const playerProcesses = await PlayerProcess.findOne({ playerId }).populate("countryId");
  
      if (!playerProcesses) {
        return res.status(404).json({ message: "Player process not found" });
      }
  
      res.status(200).json(playerProcesses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching player processes", error: error.message });
    }
  };
  