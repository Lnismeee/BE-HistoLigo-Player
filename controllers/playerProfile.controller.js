import PlayerModel from "../models/player.model.js";

export const addPlayerProfile = async (req, res, next) => {
  try {
    const player = new PlayerModel(req.body);
    await player.save();
    res.status(201).json({ message: "Player created successfully", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayerProfile = async (req, res, next) => {
  try {
    const player = await PlayerModel.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updatePlayerProfile = async (req, res, next) => {
    try {
      const player = await PlayerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.status(200).json({ message: "Player updated successfully", player });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  