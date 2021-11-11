import type * as tmindCore from './core';
import type * as tmindBiz from './biz';
import type * as timindDb from './dbProvider';
import type * as tmindHttp from './http';

/** 服务端类型定义
 *
 */
declare namespace tmind {
	/** 远程请求的 GET/POST/PUT/DELETE 方法的实现定义体
	 *
	 */
	interface apiCellDef {
		/** 远程 API 请求地址
		 *
		 */
		url: (str: string) => string,
		/** 远程请求所需附加的 header
		 *
		 */
		headers: tmindCore.IObj<any>,
		/** 远程请求的参数
		 *
		 */
		param: tmindCore.IObj<any>,
		/** 远程请求成功后，返回结果的取值回调
		 *
		 */
		resCallback: (res: any) => any
	}

	/** 远程请求预定义项
	 *
	 */
	interface apiCell {
		/** 该 API 请求所需的 token 值
		 *
		 */
		token?: string,
		/** 该 API 请求所需的 appId 值
		 *
		 */
		appId?: string,
		/** 该 API 请求所需的 secretKey 值
		 *
		 */
		secretKey?: string,
		/** 该 API 请求所需的其他附加参数
		 *
		 */
		option?: tmindCore.IObj<any>,
		/** 该 API 请求对应的 GET 请求
		 *
		 */
		get?: apiCellDef,
		/** 该 API 请求对应的 POST 请求
		 *
		 */
		post?: apiCellDef,
		/** 该 API 请求对应的 PUT 请求
		 *
		 */
		put?: apiCellDef,
		/** 该 API 请求对应的 DELETE 请求
		 *
		 */
		del?: apiCellDef
	}

	/** 支持的 SSL 文件类型
	 */
	interface IConfCert {
		key: string,
		pem?: string,
		ca?: string[],
		cert?: string
	}

	/** 服务单元配置模型
	 */
	interface IConfUnit {
		// 服务索引序号
		id: number,
		/** 服务端实例标识
		 */
		ident: string,
		/** 服务显示名称
		 */
		namezh: string,
		/** 服务描述信息
		 */
		memo: string,
		/** 服务地址，配置管理器初始化时会自动根据 isDev ，从配置文件中该项的元组列表中判断有效的值
		 */
		addr: string,
		/** 服务端口
		 */
		port: number,
		/** 是否将本服务识别标识（ident）作为访问路由的一级前缀
		 */
		prefix?: boolean,
		/** 本服务是否支持跨域
		 */
		corsed?: boolean,
		/** 额外添加的跨域响应头
		 */
		appendCorsHeader: string[],
		/** 禁用的 http 方法，
		 */
		disableMethods: string[],
		/** 跨域白名单
		 */
		corsWhiteList: string[],
		tokenLess?: string[],
		/** 采用无日志模式
		 *
		 */
		logLess: boolean,
		/** 计划任务定时器
		 */
		schedule: string,
		/** 本服务实例是否访问主业务DB服务(true为是，false表示不访问)
		 */
		linkToDb: boolean,
		/** 微信小程序配置
		 *
		 */
		weichat?: {
			appId: string,
			appSecret: string,
		}
	}

	/** DB服务单元配置模型
	 *
	 */
	interface IConfDbSvr extends IConfUnit {
		/** 数据库类型
		 *
		 */
		dbType: timindDb.supportDbType,
		/** 数据库地址
		 *
		 */
		dbAddr: string,
		/** 数据库端口
		 *
		 */
		dbPort: number,
		/** 数据库连接用户名
		 *
		 */
		user: string,
		/** 数据库连接密码
		 *
		 */
		pwd: string,
		/** 数据库超级管理员用户名
		 *
		 */
		userSupper: string,
		/** 数据库超级管理员密码
		 *
		 */
		pwdSupper: string,
		/** 数据库连接池细则
		 *
		 */
		defaultDbPool?: {
			/** 池内最大连接数
			 *
			 */
			maxConnCount: number,
			/** 池内最少连接数
			 *
			 */
			minConnCount: number
		},
		/** 字符集
		 *
		 */
		charset?: string,
		/** 排序规则
		 *
		 */
		collate?: string,
		/** 分页查询每页数量
		 *
		 */
		numInPage: number,
		/** 备份参数
		 *
		 */
		backup: {
			/** 备份文件目标文件夹路径
			 *
			 */
			destPath: string,
			/** 定时备份周期（基于 Cron表达式的字符串）
			 *
			 */
			loopStr: string
		},
		/** 请求注入对象集
		 *
		 */
		preReq?: tmindCore.IObj<tmindHttp.preDataFunc>,
		/** 响应注入对象集
		 *
		 */
		preRes?: tmindCore.IObj<tmindHttp.preDataFunc>,
	}

	/** ORM 实体配置规则
	 *
	 */
	interface IConfOrm {
		/** ORM实体类型
		 *
		 */
		type: timindDb.ormType,
		/** ORM实体代码
		 *
		 */
		code: string,
		/** ORM实体名称
		 *
		 */
		namezh: string,
		/** 表分组名称
		 *
		 */
		groupName: string,
		/** 字段定义
		 *
		 */
		columns: timindDb.IDbField[],
		/** 一览查询视图SQL语句片段
		 */
		selectViewSql?: string,
		/** 记录代码编码规则
		 *
		 */
		codeRole: string,
		/** 是否防止初始记录被变更
		 *
		 */
		keepOrigin: boolean,
		/** 是否采用物理删除
		 *
		 */
		realDel: boolean
		/** 表单推送映射
		 *
		 */
		push: {
			/** 单个推送定义的命名作为键，值为[原表要推送字段列表, 目标表接收字段列表（数组第一个元素为目标表名称）]
			 *
			 */
			[k: string]: [string[], string[]]
		},
		/** 初始化默认记录
		 *
		 */
		initValue: tmindCore.IObj<tmindBiz.IBaseBiz>[]
	}

	/** 标准CRUD之外的扩展定义
	 *
	 */
	interface IConfExt {
		/** 自定义视图
		 *
		 */
		sqlView?: string,
		/** 自定义存储过程
		 *
		 */
		sqlProc?: string,
	}

	interface IConfReserve {
		/** 脚本类型
		 *
		 */
		type: 'view' | 'func' | 'rpt';
		/** 脚本代码
		 *
		 */
		code?: string;
		/** 脚本名称
		 *
		 */
		namezh?: string;
		/** 获取脚本执行语句的函数
		 * @param dbName 数据库名称
		 * @param schemaName 模式名称
		 * @param rptName 目标对象名称
		 * @param rptNamezh 目标对象中文命名
		 */
		getSql: (dbName: string, schemaName: string, objName: string, objNamezh: string) => string;
	}

	/** 模型预加载结构
	 *
	 */
	interface IOrmPre {
		/** CRUD 模型定义
		 *
		 */
		curd: IConfOrm[],
		/** 报表脚本，系统启动时固定加载
		 *
		 */
		ext: IConfExt[],
		/** 保留的SQL脚本，系统启动时固定加载
		 *
		 */
		reserve: IConfReserve[]
	}

	/** 默认记录配置文件规则
	 *
	 */
	interface IConfKeepRecord {
		/** 是否保持原始记录，若为 TRUE,则服务重启时会自动还原默认记录值
		 *
		 */
		keepOrigin?: boolean,
		/** 默认记录集合
		 *
		 */
		records: tmindCore.IObj<any>[]
	}

	/** 实例配置
	 */
	interface IConfSvr {
		/** 工程对应的平台蓝图根节点ID
		 */
		id: string,
		/** 工程识别标识
		 */
		ident: string,
		/** 工程名称
		 */
		namezh: string,
		/** 工程级默认服务地址，适用于子服务非分布式部署时的默认值
		 *  工程级服务地址，若是下属各子服务具备独立地址，则需在子服务配置文件中单独指明
		 */
		addr: string,
		/** SSL 验证文件
		 */
		cert: IConfCert,
		/** token 加盐码
		 */
		secretKey: string,
		/** token 过期时间（单位：秒）
		 *
		 */
		expires: number,
		/** 工程版本号
		 */
		ver: string,
		/** 是否为开发环境
		 */
		isDev: boolean,
		/** 动态生成的日志服务连接地址
		 */
		loggerUrl: string,
		/** 各服务单元的配置信息
		 */
		unit: tmindCore.IObj<IConfUnit>,
		/** 实例共享的第三方公共 API 定义和配置，
		 * 	其中键名是该api从前端请求时的调用名称，该名称以[ apiGet/api名称 ]的形式作为请求url
		 *
		 */
		apis: tmindCore.IObj<apiCell>
	}
}

export = tmind;
export { };
