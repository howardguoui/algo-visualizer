import { useCallback, useMemo } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { initialNodes, initialEdges } from '../../data/curriculumGraph';

const CustomNode = ({ data }: any) => {
  return (
    <div className={`px-4 py-2 rounded-xl shadow-lg transition-transform ${data.locked ? 'bg-slate-800 opacity-60' : 'bg-slate-900 border-2 border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20 cursor-pointer'}`}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center gap-2">
        <span className="text-xl">{data.icon}</span>
        <div className="flex items-center justify-center">
          <span className={`text-sm font-bold ${data.locked ? 'text-slate-500' : 'text-slate-200'}`}>
            {data.label}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export function SkillTreeRenderer() {
  const { lang, t } = useLang();
  const navigate = useNavigate();

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const localizedNodes = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        label: lang === 'zh' ? node.data.labelZh : node.data.labelEn,
      }
    }));
  }, [nodes, lang]);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
    if (!node.data.locked && node.data.path) {
      navigate(node.data.path);
    }
  }, [navigate]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-slate-800/50 bg-slate-950">
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-blue-400">❖</span> {t('Skill Tree Curriculum', '技能树课程')}
        </h2>
        <p className="text-xs text-slate-400">{t('Master topics to unlock the next skills.', '掌握该主题以解锁下一个技能。')}</p>
      </div>

      <div className="w-full h-[600px]">
        <ReactFlow
          nodes={localizedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
        >
          <Background color="#334155" gap={20} />
          <Controls className="!bg-slate-900 !border-slate-800" />
        </ReactFlow>
      </div>
    </div>
  );
}
