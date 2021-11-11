/** 信息类型枚举
 *
 */
export declare const enum INFO_TYPE {
	/** 通用信息
	 */
	Normal_Info = 11000,
	/** 服务已启动
	 */
	Svr_Boot = 11101,
	/** 服务已恢复
	 */
	Svr_Resumed = 11102,
	/** 未标识的网络接入请求
	 */
	Req_In = 11201,
	/** 输出未标识的网络请求响应
	 */
	Req_Out = 11302,
	/** 接口请求
	 */
	Req_Io = 11401,
	/** 数据库操作
	 */
	Exec_Db = 11501
}

/** 警告类型枚举
 *
 */
export declare const enum WARN_TYPE {
	/** 通用警告
	 */
	Normal_Warn = 12000,
	/** 服务已停止
	 */
	Svr_Stoped = 12001,
	/** 服务已暂停
	 */
	Svr_Paused = 12002
}

/** 异常类型枚举
 *
 */
export declare const enum ERR_TYPE {
	/** 未定义的异常
	 */
	Unkown_ERR = 13000,
	/** 服务端启动异常
	 */
	Boot_Err = 13001,
	/** 服务端 Licese 异常
	 */
	License_Err = 13002,
	/** 服务端 SSL 文件异常
	 */
	Cert_Err = 13003,
	/** 服务端配置异常
	 */
	Config_Err = 13004,
	/** ORM 定义初始化失败
	 *
	 */
	Orm_Err = 13005,
	/** 服务端HTTP请求异常
	 */
	Svr_Http_Request_Err = 13006,
	/** 服务端内全局捕获的异常
	 */
	Svr_Catch_Err = 13007,
	/** 服务端代码内未捕获的异常
	 */
	Svr_UnCatch_Err = 13008,
	/** 服务端未处理的 Reject
	 */
	Svr_UnHandled_Reject = 13009,

	/** 数据库启动异常
	 */
	Db_Boot_Err = 13010,
	/** SQL语句执行异常
	 */
	Sql_Err = 13011,
	/** 接口连接异常
	 */
	Io_Link_Err = 13020,
	/** 接口执行异常
	 */
	Io_Exec_Err = 13021,
	/** 日志服务连接异常
	 *
	 */
	Log_Link_Err = 13031,
	/** 日志服务写入异常
	 *
	 */
	Log_Write_Err = 13032,
	/** 缺少 token 的http请求
	 *
	 */
	Sign_Token_Miss = 14000,
	/** Token过期的请求
	 *
	 */
	Sign_Token_Expire = 14001,
	/** 非法Token
	 *
	 */
	Sign_Token_Invalid = 14002
}