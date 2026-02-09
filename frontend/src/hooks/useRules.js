import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { presetRules } from '../data/presetRules';
import { 
  getCustomRules, 
  addCustomRule, 
  updateCustomRule, 
  deleteCustomRule,
  getSelectedRuleId,
  setSelectedRuleId,
  saveCustomRules
} from '../utils/storage';

/**
 * 自定义 Hook：管理规则状态
 * 包含预置规则和自定义规则的管理功能
 */
export function useRules() {
  const [customRules, setCustomRules] = useState([]);
  const [selectedRuleId, setSelectedRuleIdState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // 初始化加载自定义规则和 URL 参数
  useEffect(() => {
    const rules = getCustomRules();
    setCustomRules(rules);

    // 优先从 URL 参数获取 ruleId
    const urlRuleId = searchParams.get('ruleId');
    if (urlRuleId) {
      setSelectedRuleIdState(urlRuleId);
      setSelectedRuleId(urlRuleId);
    } else {
      // 从本地存储加载
      const savedRuleId = getSelectedRuleId();
      if (savedRuleId) {
        setSelectedRuleIdState(savedRuleId);
      } else {
        // 默认选择第一个预置规则
        setSelectedRuleIdState(presetRules[0].id);
      }
    }
  }, [searchParams]);

  // 获取所有规则（预置 + 自定义）
  const allRules = [...presetRules, ...customRules];

  // 根据 ID 获取规则
  const getRuleById = useCallback((id) => {
    // 先从预置规则中查找
    const presetRule = presetRules.find(r => r.id === id);
    if (presetRule) return presetRule;

    // 再从自定义规则中查找
    return customRules.find(r => r.id === id);
  }, [customRules]);

  // 获取当前选中的规则
  const selectedRule = selectedRuleId ? getRuleById(selectedRuleId) : presetRules[0];

  // 选择规则
  const selectRule = useCallback((id) => {
    setSelectedRuleIdState(id);
    setSelectedRuleId(id);
  }, []);

  // 添加规则
  const addRule = useCallback((rule) => {
    const newRule = addCustomRule(rule);
    setCustomRules(prev => [...prev, newRule]);
    return newRule;
  }, []);

  // 更新规则
  const updateRule = useCallback((id, updatedRule) => {
    updateCustomRule(id, updatedRule);
    setCustomRules(prev => prev.map(r => 
      r.id === id ? { ...r, ...updatedRule } : r
    ));
  }, []);

  // 删除规则
  const deleteRule = useCallback((id) => {
    deleteCustomRule(id);
    setCustomRules(prev => prev.filter(r => r.id !== id));

    // 如果删除的是当前选中的规则，则切换到第一个预置规则
    if (selectedRuleId === id) {
      setSelectedRuleIdState(presetRules[0].id);
      setSelectedRuleId(presetRules[0].id);
    }
  }, [selectedRuleId]);

  // 搜索规则
  const searchRules = useCallback((keyword) => {
    if (!keyword.trim()) return allRules;
    
    const lowerKeyword = keyword.toLowerCase();
    return allRules.filter(rule => 
      rule.name.toLowerCase().includes(lowerKeyword) ||
      rule.description.toLowerCase().includes(lowerKeyword)
    );
  }, [allRules]);

  return {
    customRules,
    allRules,
    selectedRule,
    selectedRuleId,
    loading,
    selectRule,
    addRule,
    updateRule,
    deleteRule,
    searchRules,
    getRuleById
  };
}

/**
 * 自定义 Hook：管理新手引导状态
 * @param {boolean} isAuthenticated - 用户是否已登录
 */
export function useFirstVisit(isAuthenticated) {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // 只有已登录用户才显示引导
    if (!isAuthenticated) {
      return;
    }
    
    // 检查是否是首次访问
    const isFirst = !localStorage.getItem('has_visited');
    if (isFirst) {
      setShowGuide(true);
    }
  }, [isAuthenticated]);

  const closeGuide = useCallback(() => {
    setShowGuide(false);
    localStorage.setItem('has_visited', 'true');
  }, []);

  return {
    showGuide,
    closeGuide
  };
}
