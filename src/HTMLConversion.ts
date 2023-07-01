export function convertDesToHTML(nodes: SceneNode[]): string {
    let res = ''; // We'll append the divs and stuff in here
  
    for (const node of nodes) {
      if (node.type === 'FRAME' || node.type === 'GROUP' ) {
        res += `<div style="position: relative; width: ${node.width}px; top: ${node.y}px; left:${node.x}px; height: ${node.height}px; ">`;
        res += '\n';
        // Recursively calling this function. Kinda DFS.
        res += node.children.map((childNode) => convertDesToHTML([childNode])).join('');
        res += '</div>'; // Consider this the return result of DFS. So like all the divs will be contained in one div because of this.
        res += '\n';
  
      } else if (node.type === 'TEXT') {
        res += `<p style="position: absolute; width: ${node.width}px; top: ${node.y}px; left:${node.x}px; height: ${node.height}px">`;
        res += node.characters;
        res += '\n';
        res += '</p>';
        res += '\n';
      } else if (node.type === 'MEDIA'){
        res += `<img src="${node.mediaData}" style="position: absolute; width: ${node.width}px; top: ${node.y}px; left:${node.x}px; height: ${node.height}px>`
      }
    }
  
    return res;
  }
  