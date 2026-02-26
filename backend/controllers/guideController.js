import Guide from "../models/guide.js";

// CREATE
export const createGuide = async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateGuide = async (req, res) => {
  try {
    const updated = await Guide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteGuide = async (req, res) => {
  try {
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};