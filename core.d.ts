/** tMind 框架核心定义
 *
 */

declare namespace tmind {
	/** 字符串拆分后的格式化样式
	 * @description lower 全部转换为小写
	 * @description upper 全部转换为大写
	 * @description origin 保持原始大小写不变
	 *
	 */
	type formatAfterSplit = 'lower' | 'upper' | 'origin';

	/** 键值类型接口
	 *  以键可以是任意字符串，值为T
	 */
	interface IObj<T> {
		// @ts-ignore
		[index?: string]: T;
	}

	/** 从第一个泛型中获取键名的限定范围，第二个泛型申明值类型
	 */
	type IObjKT<K, T> = {
		[P in keyof K]: T;
	}

	/** 基础键值对
	 *
	 */
	interface IKv {
		id: number;
		namezh: string;
	}

	/** 基于 代码/名称 的键值对
	 *
	 */
	interface ICodeName {
		code: string;
		namezh: string;
	}

	type nullLike = null | undefined;

	/** 全局输出信息类型
	 */
	type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | nullLike;

	/** 可作为日期传参的代类型
	 */
	type dateLike = string | number | number[] | Date | nullLike;

	/** 可作为 Boolean 传参的类型
	 */
	type boolLike = boolean | string | number | nullLike;

	/** 支持校验的数据类型
	 */
	type verifiAble = string | number | boolean | nullLike;

	/** tFrameV9 所支持的校验规则类型
	 *
	 */
	type VERIFI_RULE = 'isNum' | 'hasSpace' | 'hasSpecial' | 'maxOrMinLen';

	/** 校验规则项定义
	 */
	type IRullItem = {
		title: string,
		func: (val: verifiAble, opt: tVerifi.Irule) => boolean
	};

	/** 审批规则元素
	 *
	 */
	interface IApproItem {
		/** 具有审批权限的用户ID，若该用户具有代理审批用户，则主用户和代理用户间用 | 分隔
		 *
		 */
		userId: string | string[],
		/** 审批方式
		 * @description alone 独立审批，一旦审批执行结束，即进入下一节点
		 * @description all 会审，需该节点的所有用户审批完成后，才进入下一节点
		 * @description any 任审，该节点的任意用户审批完成后，即进入下一节点
		 */
		type: 'alone' | 'all' | 'any'
	}

	/** 审批节点（键名为该节点条件）
	 *
	 */
	interface IApproNode {
		[k: string]: IApproItem
	}

	/** 编码接口
	 */
	interface Iencode {
		/** 字符串转换为 unicode 数组
		 * @param str 待转码的字符串
		 */
		toUniCode: (str: string) => number[],
		/** 转码微信昵称
		 * @param str 微信昵称字符串
		 * @returns
		 */
		wechatNick: (str: string) => string
	}

	interface Idecode {
		/** uniCode（字符/数字）数组解析出字符串原文
		 * @param val 要解析的uniCode（字符/数字）数组
		 * @param sep 传入参数中val的拼接字符串，默认为半角中横线
		 * @returns
		 */
		toStr: (val: string | number[], sep: string) => string,
		/** 将转码后的数据解析出微信昵称
		 * @param val 要解析的uniCode（字符/数字）数组
		 * @returns
		 */
		wechatNick: (val: string | number[]) => string
	}

	interface Iparse {
		/** 将字符串编码为 uniCode格式 */
		encode: Iencode,
		/** 将uniCode 格式信息解码回字符串 */
		decode: Idecode
	}

	interface Isort {
		/** 数组 sort 方法的升序回调函数
		 *
		 * @param a
		 * @param b
		 */
		sortASC: typeof sortASC,
		/** 数组 sort 方法的降序回调函数
		 *
		 * @param a
		 * @param b
		 */
		sortDESC: typeof sortDESC
	}

	/** smpoo 方法返回的深普信息格式
	 */
	interface IsmpooInfo {
		company: string,
		appCopy: string,
		webSite: string,
		getIdent: string,
		consoleStr: void
	}
}

declare module tmind {
	/** tMind-Core 工具类
	 */
	class Tutil {
		/** 判断当前运行环境是否为浏览器
		 */
		static inBrowser: boolean;
		/** 判断当前运行环境是否为 nodeJs ServerLike
		 */
		static inSvr: boolean;
		/** 0~9 的整型数字中文大写
		 */
		static NUM_TO_STR: string[];

		static sort: Isort;
		static encode: IObj<Iencode>;
		static decode: IObj<Idecode>;
	}

	class Tdate {
		private val: Date;

		/** 判断当前实例所代表的日期是否为闰年
		 * @returns 输出为布尔值，Ture代表是，False代表否
		 */
		get isLeap(): boolean;

		/** 获取时间戳的最大绝对值。
		 *  时间戳的有效范围应该是正负（绝对值）区间
		 * @returns 代表区间范围的绝对值（正负绝对值相同）
		 */
		get abs(): number;

		/** 获取实例日期所在年份
		 * @returns 输出为整型数字格式
		 */
		get year(): number;

		/** 获取实例日期所在月份
		 * @returns 输出为整型数字
		 */
		get month(): number;

		/** 获取实例日期的公历号数
		 * @returns 输出为整型数字
		 */
		get day(): number;

		/** 获取实例日期的小时值
		 * @returns 输出为整型数字
		 */
		get hour(): number;

		/** 获取实例日期的分钟值
		 * @returns 输出为整型数字
		 */
		get minute(): number;

		/** 获取实例日期的秒数
		 * @returns 输出为整型数字
		 */
		get second(): number;

		/** 获取实例日期的毫秒数
		 * @returns 输出为整型数字
		 */
		get millisecond(): number;

		/** 获取实例日期是周几
		 * @returns 输出整型数字代表的周（本周第几天，周一为1，周日为7）
		 */
		get week(): number;

		/** 获取实例日期的所在季度
		 * @returns 输出整型数字代表的季度序号，起始为1
		 */
		get quarter(): number;

		/** 获取实例日期对应的节气
		 * @returns
		 */
		get solar(): string;

		/** 获取实例日期所对应的星座
		 */
		get sign(): string;

		/** 获取实例日期所对应的属相
		 */
		get animal(): string;

		/** 获取实例日期是所在季度的第几天
		 * @returns 输出整型数字代表的周（起始为1）
		 */
		get indexOfQuarter(): number;

		/** 获取实例日期是所在年份的第几天
		 * @returns 输出整型数字代表的周（起始为1）
		 */
		get indexOfYear(): number;

		/** 获取实例日期所在月份的总天数
		 */
		get daysOfMonth(): number;

		/** 获取实例日期所在季度的总天数
		 */
		get daysOfQuarter(): number;

		/** 获取实例日期所在年份的总天数
		 * @returns
		 */
		get daysOfYear(): number;

		/** 获取实例日期相比所在周的百分比占比
		 * @returns
		 */
		get ratioOfWeek(): number;

		/** 获取实例日期相比所在月的百分比占比
		 * @returns
		 */
		get ratioOfMonth(): number;

		/** 获取实例日期相比所在季度的百分比占比
		 * @returns
		 */
		get ratioOfQuarter(): number;

		/** 获取实例日期相比所在年份的百分比占比
		 * @returns
		 */
		get ratioOfYear(): number;

		/** 获取实例日期对应的天干纪年法
		 */
		get tiangan(): string;

		/** 获取实例日期属于本月第几周
		 * @returns 输出整型数字代表的月内周次序号，起始为1
		 */
		get weekOfMonth(): number;

		/** 获取实例日期属于当年第几周
		 * @returns 输出整型数字代表的年内周次序号，起始为1
		 */
		get weekOfYear(): number;

		/** 将指定日期按照提供的模式匹配字符串格式化
		 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
		 * @returns 已格式化的时间 / 日期 字符串（整型数字形式）
		 */
		format: (fmt?: string) => string;

		/** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
		 * @param {*} withYear 是否输出年份，默认为否
		 * @param {*} withTime 是否输出时间信息
		 * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
		 */
		formatAsCn: (withYear: boolean, withTime?: boolean) => string;

		/** 将指定日期格式化为农历表示法
		 * @param {boolean} skipYear 是否省略年份信息
		 * @returns 已格式化的农历日期
		 */
		formatAsLunar: (skipYear: boolLike) => string;

		/** 获取实例日期的佛历表示法
		 * @returns 已格式化的佛历日期
		 */
		formatAsBh: () => string;

		/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
		 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
		 * @returns 已格式化的字符串
		 */
		formatAsWorld: (languageTag: string | nullLike) => string;

		/** 获取实例日期的周信息
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的周（本周第几天，周一为1，周日为7），若传入参数不为空，则返回字符化的周信息。
		 */
		getWeek: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期属于本月第几周
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的月内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
		 */
		getWeekOfMonth: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期属于当年第几周
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的年内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
		 */
		getWeekOfYear: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期的所在季度
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的季度序号，起始为1，若传入 zh ，则将数字中文字符化
		 */
		getQuarter: (local?: 'zh' | 'en') => string | number;

		/** 获取相对于实例日期，指定单位数量（天、周、月、年）之前或之后的日期值
		 *
		 * @param diffNum 与实例日期间相差的数量（默认单位为天），为正则返回日期在实例日期之后，反之则在实例日期之前
		 * @param diffType 相对于实例日期，相差数量的日期单位
		 */
		getOffset: (diffNum: number, diffType?: 'day' | 'week' | 'month' | 'year') => string;

		/** 比较两个日期数据，并返回相差数量，单位为（天、周、月、年、时、分、秒）
		 *
		 * @param start 要比较的基准日期
		 * @param end 要比较的目标日期
		 * @param outputType 返回值所使用的日期单位，默认为天
		 */
		getDiff: (dateVal: Date | string | number, outputType?: 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year') => number;

		/** 将实例日期的值转换为数字
		 *
		 * @param notTimestamp 是否弃用时间戳形式而改为用户序列值，默认为否。为真时，可以自定义数字来源中包含的日期时间片段
		 * @param fmt 自定义数字来源片段的格式化字符串，仅当 notTimestamp 为真时有效
		 * @returns
		 */
		toNumber: (notTimestamp: boolean, fmt?: string) => number;

		/** 获取实例日期的 JSON 对象表示
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 格式化后的 JSON 对象
		 */
		toJson: (local?: 'zh' | 'en') => IObj<number | boolean | string>;

		/** 将实例日期转换为值数组
		 * @param {*} includTime [可选]是否包含时间信息
		 * @returns 不传入参数时，默认返回数组内元素依次为 [年，月，日，时，分，秒，毫秒]
		 */
		toArr: (includTime?: boolean) => number[];
	}

	class ITVerifi {
		constructor(val: verifiAble, fullCheck?: boolean, ...rules: tVerifi.Irule[]);
		/** 获取当前实例校验结果
		 */
		get isOk(): boolean;

		/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
		 * @returns
		 */
		static getRules(): IObj<string>;

		isNum(opt: tVerifi.Irule): ITVerifi;
	}

	function smpoo(): IsmpooInfo;

	function sortASC(a: string, b: string): number;
	function sortASC(a: number, b: number): number;
	function sortDESC(a: string, b: string): number;
	function sortDESC(a: number, b: number): number;

	function tCheckType(val: any): string;

	/** 控制台打印替代
	 *
	 * @param msg 要输出的信息
	 * @param title 标题
	 * @param type 输出样式类型
	 */
	function tEcho(msg: any, title?: string, type?: MSG_TYPE): void;
	/** 控制台清除替代
	 */
	function tClear(): void;

	/** 获取 Tdate 对象
	 *
	 */
	function tDate(): Tdate;
	/** 获取 Tdate 对象
	 *
	 * @param val 代表时间日期的字符串
	 */
	function tDate(val: string): Tdate;
	/** 获取 Tdate 对象
	 *
	 * @param val 代表时间日期的时间戳数字
	 */
	function tDate(val: number): Tdate;
	/** 获取 Tdate 对象
	 *
	 * @param y 年
	 * @param m 月
	 * @param d 日
	 * @param h 时
	 * @param mi 分
	 * @param s 秒
	 * @param ms 毫秒
	 */
	function tDate(y: number, m: number, d?: number | undefined, h?: number | undefined, mi?: number | undefined, s?: number | undefined, ms?: number | undefined): Tdate;

	namespace tPinyin {
		/** 依据传入中文数组的首字母分组
		 *
		 * @param arr 要进行分组的中文数组
		 * @param fullLetter 若为True，则即时某个字母标签下没有匹配的文字，也返回空数组
		 * @returns 按照26个英文字母分组的结果集
		 */
		function groupByFirstLetter(arr: string[], fullLetter: boolean): IObj<string[]>;

		/** 获取传入文字的首字母
		 * @param word 要获取首字母的字符串
		 * @returns
		 */
		function getFirstLetter(word: string): string;
	}

	namespace tVerifi {
		/** 校验参数
		 */
		interface Irule {
			/** 支持的校验模版
			 */
			patten: VERIFI_RULE,
			/** 正则断言为匹配时的值
			 *  默认为 TRUE，若设为 FALSE，设为断言匹配，但需拒绝
			 */
			trueVal?: boolean,
			/** 校验规则中要求的最小长度
			 */
			minLen?: number,
			/** 校验规则中允许的最大长度
			 */
			maxLen?: number,
			/** 进制类型判断的可选范围
			 */
			numType?: '2' | '8' | '10' | '16' | '26',
			/** 校验结论
			 */
			isOk?: boolean,
			/** 校验报告
			 */
			reason?: ''
		}
		/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
		 */
		function getRules(): IObj<string>;
		/** 执行有效性校验
		 * @param val 要校验的值，支持校验的值类型为：（string | number | boolean | null | undefined）
		 * @param fullCheck 链式校验过程中，是否强制全链遍历
		 *  			若为 false，则任何一环校验失败，则立即终止校验
		 * @param rules 校验规则组
		 * @returns
		 */
		function check(val: verifiAble, fullCheck?: boolean, ...rules: tVerifi.Irule[]): boolean;
	}
}

export = tmind;
