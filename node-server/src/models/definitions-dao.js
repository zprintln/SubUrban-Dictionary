import definitionsModel from "./definitions-model.js";

export const findAllDefinitions = () => definitionsModel.find();

export const findDefinitionById = (id) => definitionsModel.findById(id);

export const createDefinition = (definition) =>
  definitionsModel.create(definition);

export const updateDefinition = (id, definition) =>
  definitionsModel.updateOne({ _id: id }, { $set: definition });

export const deleteDefinition = (id) => definitionsModel.deleteOne({ _id: id });
