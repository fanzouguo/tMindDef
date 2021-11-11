/** UI 类型定义
 *
 */
declare namespace tmind {
	/** 页面 CRUD 状态
	 * @description list 列表显示状态
	 * @description view 详情信息显示状态
	 * @description add 数据新增状态
	 * @description edit 数据编辑状态
	 * @description del 数据删除状态
	 * @description any 任意状态
	 */
	type TPageState = 'list' | 'view' | 'add' | 'edit' | 'del' | 'any';

	/** 操作按钮定义
	 *
	 */
	interface IOptBtn {
		/** 按钮ID
		 *
		 */
		id: number,
		/** 按钮触发的事件名称
		 *
		 */
		code: string,
		/** 按钮显示名称
		 *
		 */
		namezh: string,
		/** 允许显示该按钮的页面属性
		 *
		 */
		showState: TPageState[],
		/** 点击后将触发页面状态变化为指定值，
		 *
		 */
		toState?: TPageState,
		/** 按钮图标名称
		 *
		 */
		icoName?: string,
		/** 该按钮是否显示为强调主色
		 *
		 */
		isPrimary?: boolean,
	}
}

export = tmind;
export { };

