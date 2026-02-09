/**
 * 本地存储工具函数
 * 用来存储和读取用户的自定义规则
 */
const STORAGE_KEY = 'custom_rules';
const SELECTED_RULE_KEY = 'selected_rule';
const FIRST_VISIT_KEY = 'first_visit';

/**
 * 获取所有自定义规则
 * @returns {Array} 自定义规则数组
 */
export function getCustomRules() {
  try {
    const rules = localStorage.getItem(STORAGE_KEY);
    return rules ? JSON.parse(rules) : [];
  } catch (error) {
    console.error('读取本地规则失败:', error);
    return [];
  }
}

/**
 * 保存自定义规则
 * @param {Array} rules 规则数组
 */
export function saveCustomRules(rules) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
  } catch (error) {
    console.error('保存本地规则失败:', error);
  }
}

/**
 * 添加新规则
 * @param {Object} rule 新规则对象
 * @returns {Object} 添加后的规则（包含ID）
 */
export function addCustomRule(rule) {
  const rules = getCustomRules();
  const newRule = {
    ...rule,
    id: Date.now().toString()
  };
  rules.push(newRule);
  saveCustomRules(rules);
  return newRule;
}

/**
 * 更新规则
 * @param {string} id 规则ID
 * @param {Object} updatedRule 更新后的规则数据
 */
export function updateCustomRule(id, updatedRule) {
  const rules = getCustomRules();
  const index = rules.findIndex(r => r.id === id);
  if (index !== -1) {
    rules[index] = { ...rules[index], ...updatedRule };
    saveCustomRules(rules);
  }
}

/**
 * 删除规则
 * @param {string} id 规则ID
 */
export function deleteCustomRule(id) {
  const rules = getCustomRules();
  const filtered = rules.filter(r => r.id !== id);
  saveCustomRules(filtered);
}

/**
 * 获取当前选中的规则ID
 * @returns {string|null} 规则ID
 */
export function getSelectedRuleId() {
  return localStorage.getItem(SELECTED_RULE_KEY);
}

/**
 * 保存当前选中的规则ID
 * @param {string} id 规则ID
 */
export function setSelectedRuleId(id) {
  localStorage.setItem(SELECTED_RULE_KEY, id);
}

/**
 * 检查是否是首次访问
 * @returns {boolean}
 */
export function isFirstVisit() {
  const visited = localStorage.getItem(FIRST_VISIT_KEY);
  return !visited;
}

/**
 * 标记已访问
 */
export function markVisited() {
  localStorage.setItem(FIRST_VISIT_KEY, 'true');
}
