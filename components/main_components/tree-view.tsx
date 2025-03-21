import {  Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

export interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  nodes: TreeNode[];
  isExtended?: boolean;
  selectionMode?: "multi" | "single";
}

const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  isExtended,
  selectionMode = "single",
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<number>>(new Set());

  const findNodeById = (nodes: TreeNode[], id: number): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return node; // Node found
      }
      if (node.children) {
        const foundNode = findNodeById(node.children, id);
        if (foundNode) {
          return foundNode; // Node found in children
        }
      }
    }
    return null; // Node not found
  };

  const toggleNode = (id: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectNode = (id: number) => {
    setSelectedNodes((prev) => {
      const newSet =
        selectionMode === "multi" ? new Set(prev) : new Set<number>();
      const node = findNodeById(nodes, id);

      if (node) {
        if (newSet.has(id)) {
          newSet.delete(id); // Unselect the node
          // Unselect all children
          if (node.children) {
            node.children.forEach((child) => {
              newSet.delete(child.id);
              // Recursively unselect children of the child
              unselectAllChildren(child, newSet);
            });
          }
        } else {
          newSet.add(id); // Select the node
          // Select all children
          if (node.children) {
            node.children.forEach((child) => {
              newSet.add(child.id);
              // Recursively select children of the child
              selectAllChildren(child, newSet);
            });
          }
        }
      }
      return newSet;
    });
  };

  const selectAllChildren = (node: TreeNode, selectedSet: Set<number>) => {
    if (node.children) {
      node.children.forEach((child) => {
        selectedSet.add(child.id);
        selectAllChildren(child, selectedSet); // Recursively select children
      });
    }
  };

  const unselectAllChildren = (node: TreeNode, selectedSet: Set<number>) => {
    if (node.children) {
      node.children.forEach((child) => {
        selectedSet.delete(child.id);
        unselectAllChildren(child, selectedSet); // Recursively unselect children
      });
    }
  };

  const renderTree = (
    nodes: TreeNode[],
    isExtended?: boolean,
    isParent?: boolean,
  ) => {
    if (isExtended) {
      return nodes.map((node) => (
        <div key={node.id}>
          <div
            className={`flex items-center gap-1`}
            
          >
            <div
              className={`w-[10px] h-fit self-center ${!isParent ? "border-b-small border-default-200 dark:border-default-100" : ""}`}
            ></div>
            <div>
              <Checkbox
                isSelected={selectedNodes.has(node.id)}
                onChange={() => selectNode(node.id)}
                size="sm"
              >
                {node.id} {node.name}
              </Checkbox>
            </div>
          </div>
          {node.children && (
            <div className="ml-[23px] flex flex-row">
              <div className="border-l-small border-default-200 dark:border-default-100 mb-3"></div>
              <div>{renderTree(node.children, isExtended)}</div>
            </div>
          )}
        </div>
      ));
    }

    return nodes.map((node) => (
      <div key={node.id} className="ml-2">
        <div className={`flex items-center gap-1`}>
          <div
            className={`cursor-pointer transition-transform duration-300 ease-in-out transform ${expandedNodes.has(node.id) ? "rotate-90" : ""}`}
          >
            <Icon icon="line-md:chevron-right" />
          </div>
          <div
            className="cursor-pointer flex items-center"
          >
            {node.name}
          </div>
        </div>

        {node.children && expandedNodes.has(node.id) && (
          <div className="ml-4">{renderTree(node.children, isExtended)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full  px-1 py-2 rounded-small border-small border-default-200 dark:border-default-100">
      {renderTree(nodes, isExtended, true)}
    </div>
  );
};

export default TreeView;
