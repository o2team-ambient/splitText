class splitText {
  constructor(dom, opt = {}) {
    this.opt = opt

    let textNode = dom.childNodes[0]
    this.splitCharacters(textNode)
    return dom.childNodes
  }
  splitCharacters(textNode) {
    var characters = textNode.nodeValue.toString();
    var chars = [];
    if (characters.trim() != "") {
      for (var c = 0; c <= characters.length - 1; c++) {
        var character = characters.substr(c, 1)
        if (character.trim() != "") {
          var char = this.createElement(character, textNode);
          chars.push(char);
        }
      }
      textNode.parentNode.removeChild(textNode);
    }
    return chars;
  }
  createElement(text, relatedNode) {
    var node = document.createElement("div");
    var nodeText = document.createTextNode(text);
    node.nodeText = nodeText;
    node.appendChild(nodeText);
    node.style.display = "inline-block";
    node.style.position = "relative";
    if (text.trim() == "") node.style.width = String(options.spacing) + "px";
    relatedNode.parentNode.insertBefore(node, relatedNode);
    return node;
  }
}

export default splitText