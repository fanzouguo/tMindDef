import type * as tmindCore from './core';
import type * as tmindBiz from './biz';

/** DB 驱动接口
 *
 */
declare namespace tmind {
	/** 可提供的初始化语句的对象类型
	 *
	 */
	type dbInitType = 'db' | 'table' | 'view' | 'procedure' | 'function' | 'trigger';

	/** 数据库表操作类型
	 *	@description SELECT 查询
	 *	@description INSERT 新增
	 *	@description UPDATE 修改
	 *	@description DELETE 伪删除
	 *	@description REMOVE 物理删除
	 *	@description CLEAR 清理伪删除数据
	 *	@description STOP 停用|禁用
	 *	@description APPROV 审批
	 */
	type dbTableOptType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'REMOVE' | 'CLEAR' | 'STOP' | 'APPROV';

	/** tFrame 平台支持的 DB 类型
	 *
	 */
	type supportDbType = 'mysql' | 'postgre' | 'mongodb' | 'sqlite' | 'lowDb' | 'msSql' | 'oracle' | 'db2';

	/** tFrame 平台支持的DB字段数据类型（以postgresql为准）
	 */
	type supportColumnType = 'index' | 'bit' | 'varbit' | 'bool' | 'bytea' | 'char' | 'varchar' | 'text' | 'cidr' | 'inet' | 'macaddr' | 'macaddr8' | 'numeric' | 'timestamp' | 'date' | 'time' | 'float4' | 'float8' | ' int2' | ' int4' | ' int8' | 'json' | 'jsonb' | 'uuid';

	/** ORM对象类型
	 */
	type ormType = 'master' | 'bill' | 'report' | 'system' | 'setting' | 'dict';

	/** dbProvider 事件类型
	 *  @description error 通用异常
	 *  @description initOk 初始化成功
	 *  @description initErr 初始化存在异常
	 *  @description execOk 语句执行成功
	 *  @description execErr 语句执行失败
	 */
	type eventType = 'error' | 'initOk' | 'initErr' | 'execOk' | 'execErr';

	/** 主从结构中，主表新增数据后的返回结构
	 *
	 */
	type IMasterInsertReturn = Promise<void> | Promise<{
		id?: number,
		insertId?: number
	}>;

	/** tFrame 平台字段定义规范
	 *
	 */
	interface IDbField {
		/** 字段名称
		 *
		 */
		code: string,
		/** 字段标签
		 *
		 */
		namezh: string,
		/** 字段类型
		 *
		 */
		type: string,
		/** 字段长度
		 *
		 */
		len: number,
		/** 小数位数
		 *
		 */
		decimalLen: number,
		/** 是否允许空
		 *
		 */
		nullable: boolean,
		/** 默认值
		 *
		 */
		defaultVal: string | number | boolean | tmindCore.IObj<any>,
		/** 字段说明
		 *
		 */
		memo: string
	}

	/** 数据表记录基类
	 *
	 */
	interface IRecode extends tmindCore.IKv, tmindCore.ICodeName {
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
		/** 当前审批进度，初始值为：1000
		 * 若审批重启，则在最高位递增，
		 * 如3000代表第三轮审批重启，2005代表第二轮的第5个审批节点
		 */
		approStep: number;
		/** 该记录是否已冻结
		 *
		 */
		stopped: tmindCore.boolLike;
		/** 该记录是否已标记删除
		 *
		 */
		deleted: tmindCore.boolLike;
		/** 记录创建者ID
		 *
		 */
		createBy: number;
		/** 修改者ID
		 *
		 */
		changeBy: number;
		/** 记录创建时间
		 *
		 */
		createTime: number;
		/** 最后创建时间
		 *
		 */
		changeTime: number;
	}

	/** SELECT 语句参数结构
	 *
	 */
	interface IoptSelect {
		/** 模式名称
		 *
		 */
		schame?: string;
		/** 目标数据表名称
		 *
		 */
		tblName: string;
		/** 要申明的查询字段范围, master 查询中，省略则返回 id, namezh，其他业务中不提供则返回 *
		 *
		 */
		listRange?: string;
		/** 需要同步查询的关联从表对象参数
		 *
		 */
		detailOpt?: IoptSelect | IoptSelect[];
		/** 数据载荷
		 */
		payload: tmindCore.IObj<any>;
		/** 该请求需要附加的字典名称
		 *
		 */
		master?: string[];
		/** 每页查询数量
		 *
		 */
		numInPage?: number;
		/** 当前请求的页序（始于 0）
		 *
		 */
		pageIndex?: number;
		/** 查询请求发起用户者ID
		 *
		 */
		userId: number;
	}

	/** INSERT 语句参数结构
	 *
	 */
	interface IoptInsert {
		/** 模式名称
		 *
		 */
		schame?: string;
		/** 目标数据表名称
		 *
		 */
		tblName: string;
		/** 数据载荷
		 *
		 */
		payload: tmindBiz.IBaseBiz | tmindBiz.IBaseBiz[];
		/** 需要同步新增的关联从表对象参数
		 *
		 */
		detailOpt?: IoptInsert | IoptInsert[];
		/** 数据载荷元素对应的 PID 值（如果该值大于0，则具有最高优先级，SQL语句中的 pid 字段优先取该值）
		 *
		 */
		pidVal?: number;
		/** 新增请求发起用户者ID
		 *
		 */
		userId: number;
	}

	/** UPDATE 语句参数结构
	 *
	 */
	interface IoptUpdate {
		/** 模式名称
		 *
		 */
		schame?: string;
		/** 目标数据表名称
		 *
		 */
		tblName: string;
		/** 数据载荷
		 *
		 */
		payload: tmindBiz.IBaseBiz | tmindBiz.IBaseBiz[];
		/** 需要同步更新的关联从表对象参数
		 *
		 */
		detailOpt?: IoptUpdate | IoptUpdate[];
		/** 更新请求发起用户者ID
		 *
		 */
		userId: number;
	}

	/** DELETE 语句参数结构
	 *
	 */
	interface IoptDelete {
		/** 模式名称
		 *
		 */
		schame?: string;
		/** 目标数据表名称
		 */
		tblName: string
		/** 数据载荷
		 */
		payload: tmindCore.IObj<any>;
		detailOpt?: IoptDelete | IoptDelete[]
		/** 删除请求发起用户者ID
		 *
		 */
		userId: number;
	}

	/** 表操作日志传参对象
	 *
	 */
	interface IOptLogTblOpt {
		/** 模式名称
		 *
		 */
		schame?: string;
		/** 触发日志的操作记录的ID
		 *
		 */
		recordId: number,
		/** 表操作类型
		 *
		 */
		optType: dbTableOptType,
		/** 备注
		 *
		 */
		memo: string,
		/** 发起表操作的用户ID
		 *
		 */
		optUserId: number
	}
}

export = tmind;
export { };
