import useAllSrs, { Srs } from "../hooks/useCodebeamer";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const SrsView = () => {
  const { stateSrs, error, isLoading } = useAllSrs("84631");
  const renderTree = (srs: Srs) => (
    <TreeItem key={srs.id} nodeId={srs.id.toString()} label={srs.name}>
      {Array.isArray(srs.children)
        ? srs.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {stateSrs && renderTree(stateSrs)}
      </TreeView>
    </>
  );
};

export default SrsView;
