import definitionsModel from "./definitions-model.js";

export const findAllDefinitions = () => definitionsModel.find();

export const findAllDefinitionsByUser = (user) =>
  definitionsModel.find({ user: user });

export const findAllDefinitionsByWordContains = (word) =>
  definitionsModel.find({ word: `/${word}/i` });

export const findDefinitionById = (id) => definitionsModel.findById(id);

export const createDefinition = (definition) =>
  definitionsModel.create({ ...definition, posted_at: new Date() });

export const updateDefinition = (id, definition) =>
  definitionsModel.updateOne({ _id: id }, { $set: definition });

export const updateDefinitions = (oldUsername, newUsername) =>
  definitionsModel.updateMany(
    { user: oldUsername },
    { $set: { user: newUsername } }
  );

export const deleteDefinition = (id) => definitionsModel.deleteOne({ _id: id });
