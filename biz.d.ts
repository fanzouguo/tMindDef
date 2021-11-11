import type * as tmindCore from './core';

declare module tmind {
	/** 业务对象基类
	 *
	 */
	interface IBaseBiz extends tmindCore.IKv, tmindCore.ICodeName {
		/** 记录ID
		 *
		 */
		id: number;
		/** 从属主记录ID
		 *	(!)勿用于业务逻辑中的关联关系
		*/
		pid: number;
		/** 业务 code
		 *
		 */
		code: string;
		/** 业务名称
		 *
		 */
		namezh: string;
		/** 备注
		 *
		 */
		memo: string;
		/** 是否停用
		 *
		 */
		stopped?: tmindCore.boolLike
	}

	/** 用户信息基类
	 *
	 */
	interface IUserBase extends IBaseBiz {
		/** 用户ID
		 */
		id: number,
		/** 上级挂载对象ID
		 */
		pid: number,
		/** 用户登录码
		 */
		code: string,
		/** 非中文母语的用户名称
		 */
		name: string,
		/** 用户中文名称
		 */
		namezh: string,
		/** 用户昵称
		 */
		nickName: string,
		/** 用户昵称
		 */
		gender: number,
		/** 头像地址
		 */
		avatar: string,
		/** 赋权值
		 */
		authStr: string,
		/** 用户备注
		 *
		 */
		memo: string,
		/** 该账号是否由 admin 仿冒登录
		 *
		 */
		adminFake: boolean,
		/** 用于登录的鉴权 token
		 *
		 */
		token?: string,
		/** 微信小程序的 openId
		 *
		 */
		openidWeichat?: string,
		/** 飞书应用的 openId
		 *
		 */
		openidFeishu?: string,
		/** 钉钉应用的 openId
		 *
		 */
		openidDingTalk?: string,
	}

	interface IMenu extends IBaseBiz {
		/** 菜单ID
		 */
		id: number,
		/** 上级菜单ID
		 */
		pid: number,
		/** 代码
		 */
		code: string,
		/** 菜单名称
		 */
		namezh: string,
		/** 菜单图标
		 */
		ico: string,
		/** 菜单导航路径
			*
			*/
		url: string,
		/** 最大审批步骤数
			*
			*/
		maxApproStep: number,
		/** 审批规则
			*
			*/
		approRules: tmindCore.IApproNode[],
		/** 菜单级别
			*
			*/
		level: number,
		/** 是否具有子级
			*
			*/
		hasSub: boolean,
		/** 排序值
			*
			*/
		orderIndex: number,
		/** 子级元素
			*
			*/
		subs?: IMenu[]
	}

	class Tuser implements IUserBase {
		/** 用户ID
		 */
		public id: number;
		/** 上级挂载对象ID
		 */
		public pid: number;
		/** 用户登录码
		 */
		public code: string;
		/** 非中文母语的用户名称
		 */
		public name: string;
		/** 用户中文名称
		 */
		public namezh: string;
		/** 用户昵称
		 */
		public nickName: string;
		/** 用户昵称
		 */
		public gender: number;
		/** 头像地址
		 */
		public avatar: string;
		/** 赋权值
		 */
		public authStr: string;
		/** 用户备注
		 *
		 */
		public memo: string;
		/** 该账号是否由 admin 仿冒
		 *
		 */
		public adminFake: boolean;
		/** 用于登录的鉴权 token
		 *
		 */
		public token: string;
		/** 微信小程序的 openId
		 *
		 */
		public openidWeichat: string;
		/** 飞书应用的 openId
		 *
		 */
		public openidFeishu: string;
		/** 钉钉应用的 openId
		 *
		 */
		public openidDingTalk: string;
	}
}

export = tmind;
export { };
