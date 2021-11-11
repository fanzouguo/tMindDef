const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');
const inquirer = require('inquirer');
const { tDate, tEcho, tClear } = require('tmind-core');

const BASE_PATH = process.cwd();
const VER_POLICY = {
	major: 0,
	minor: 1,
	build: 2
};

/** 更新 package.json 文件的版本号
 *
 * @param {*} ver 待更新的版本号
 * @param {*} pliicy 更新策略
 * @returns
 */
const updateVer = (ver, pliicy = 0) => {
	const _arr = ver.split('.');
	_arr[pliicy]++;
	if (pliicy < 2) {
		for (let i = pliicy + 1; i < 3; i++) {
			_arr[i] = 0;
		}
	}
	return _arr.join('.');
};

/** 环境检查
 *
 * @param {*} strCmd 待检查的环境命令
 * @param {*} strEcho 待检查的环境命令的显示别名
 */
const envCheck = (strCmd, strEcho) => {
	if (!shelljs.which(strCmd)) {
		//在控制台输出内容
		shelljs.echo(`本脚本依赖于：${strEcho || strCmd}，但系统未安装。`);
		shelljs.exit(1);
	}
}

const exec = async () => {
	tClear();
	//检查控制台是否以运行`git `开头的命令
	envCheck('git');
	envCheck('node', 'nodeJS');
	const path_pkg = path.resolve(BASE_PATH, 'package.json');
	const pkg = fs.readJsonSync(path_pkg);
	const { policyVal } = await inquirer.prompt({
		name: 'policyVal',
		type: 'list',
		message: '请选择版本更新策略',
		default: 'build',
		choices: [
			'major',
			'minor',
			'build'
		]
	});
	const { GIT_MEMO } = await inquirer.prompt({
		type: 'input',
		message: '请输入提交备注',
		name: 'GIT_MEMO'
	});
	pkg.version = updateVer(pkg.version, VER_POLICY[policyVal]);
	fs.writeFileSync(path_pkg, JSON.stringify(pkg, null, 2));
	const _arrCmd = [
		'git add .',
		`git commit -m "${tDate().format('yyyy-mm-dd hh:mi:ss')}-${GIT_MEMO}"`,
		'git push -u origin main',
		'npm publish'
	];
	try {
		for (const v of _arrCmd) {
			// @ts-ignore
			await shelljs.exec(v);
		}
		tEcho('发布完成！\n\n', '成功', 'SUCC');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

exec();