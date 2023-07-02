import { convertDesToHTML } from "./HTMLConversion";//HELLO
figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = async (pluginMessage) => {
  // console.log(pluginMessage.name);
  // const frameNode = figma.currentPage.findOne((node)=>node.type === 'FRAME') as FrameNode;
  // console.log(frameNode);

  if (pluginMessage.type === "desToHTML") {
    const nodes = figma.currentPage.selection as SceneNode[];
    // const nodes = figma.currentPage.findAll();
    // console.log(convertDesToHTML)
    const html = await convertDesToHTML(nodes);
    // console.log(html);
    await figma.loadFontAsync({family: "Inter", style: "Regular"})
    const text = figma.createText();
    text.characters = html;
    figma.ui.postMessage({pluginMessage: {type: 'result', html}})
    console.log("Hello")
  }
  // figma.closePlugin();
};
