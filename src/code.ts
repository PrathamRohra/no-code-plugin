import { convertDesToHTML } from "./HTMLConversion";//HELLO
figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = (pluginMessage) => {
  // console.log(pluginMessage.name);
  // const frameNode = figma.currentPage.findOne((node)=>node.type === 'FRAME') as FrameNode;
  // console.log(frameNode);

  if (pluginMessage.type === "desToHTML") {
    const nodes = figma.currentPage.findAll();
    const html = convertDesToHTML(nodes);
    console.log(html);
    figma.ui.postMessage({pluginMessage: {type: 'result', html}})
    console.log("HEllo")
  }
  // figma.closePlugin();
};
