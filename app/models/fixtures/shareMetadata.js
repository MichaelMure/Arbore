import ShareMetadata from '../ShareMetadata'

export default [
  ShareMetadata.create("title", "description", "message"),
  ShareMetadata.create("Share Title",
    "Share description. Like a very long text with some HIuuuuuUUuuugge words. THe better words evar.",
    "best message evar"),
  ShareMetadata.create("title", "Moderately long description"),
  ShareMetadata.create("title", "description", "Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the map() body is too nested, it might be a good time to extract a component."),
]
