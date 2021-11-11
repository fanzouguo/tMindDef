
declare namespace tmind {
	/** 请求或响应注入函数
	 * @data 原始的请求或响应数据
	 * @dbExecer db 执行器，该执行器可执行 db 请求，遵循 tmind-dbProvider 规范
	 * @httpExecer http 请求器，该请求器可发起 http 请求，遵循 tmind-svr.http 规范
	 */
	type preDataFunc = (data: any, dbExecer: any, httpExecer: any) => Promise<any>;


	/** 请求响应成功的返回数据格式
	 */
	interface IResData {
		// 原始请求 ID
		reqId: number,
		// 响应状态码
		code: number,
		// 返回数据
		data?: any,
		// 响应提示
		msg?: string,
		// 本次请求及响应是否已成功执行完毕（不包含诸如通讯、网络等原因造成的请求失败，仅代表基于请求的响应函数执行状态）
		isOk?: boolean,
		// 与 isOk 互斥，主要以 isOk 为主，isErr 仅从三方开发或接口角度的多样适配性考虑。
		isErr?: boolean
	}
}

export = tmind;
export { };
