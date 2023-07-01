export async function convertDesToHTML(nodes: SceneNode[]): Promise<string> {
    let res = ''; // We'll append the divs and stuff in here
    // console.log(nodes);
    for (const node of nodes) {
      // let nodeData2 = await node.getCSSAsync();
      //   console.log(nodeData2);
      //   console.log(node.type);
      if (node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'COMPONENT') {
        let nodeData = await node.getCSSAsync();
        // console.log(nodeData); top: ${node.y}px; left:${node.x}px;
        res += `<div style="position: relative; width: ${nodeData.width};  height: ${nodeData.height}; background-color: ${nodeData.background}; display: ${nodeData.display}">`;
        res += '\n';
        // Recursively calling this function. Kinda DFS.
        const childHTML = await Promise.all(node.children.map(async (childNode) => await convertDesToHTML([childNode])));
      res += childHTML.join('');
        res += '</div>'; // Consider this the return result of DFS. So like all the divs will be contained in one div because of this.
        res += '\n';
  
      } else if (node.type === 'TEXT') {
        let nodeData = await node.getCSSAsync();
        res += `<p style="position: absolute; width: ${node.width}px; top: ${node.y}px; left:${node.x}px; height: ${node.height}px; color: ${nodeData.color}; font-size: ${String(node.fontSize)} ">`;
        res += node.characters;
        res += '\n';
        res += '</p>';
        res += '\n';
      } 
      else if (node.type === 'RECTANGLE') {
        let nodeData = await node.getCSSAsync();
        res += `<div style="position: absolute; width: ${node.width}px; top: ${node.y}px; left:${node.x}px; height: ${node.height}px; background-color: ${nodeData.background}"></div>\n`;
      } else if (node.type === 'VECTOR') {
        let nodeData = await node.getCSSAsync();
        res += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${node.width} ${node.height}" style="position: absolute; width: ${node.width}px; top: ${node.y}px; left:${node.x}px;">\n`;
        res += `<path  fill="${nodeData.background}" />\n`;
        res += `</svg>\n`;
      }
      
    }
  
    return res;
  }
  