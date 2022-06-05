export default {
	getdatetime: function (dt) {
		var res = '';
		res += formatdigits(dt.getFullYear());
		res += '-';
		res += formatdigits(dt.getMonth() + 1);
		res += '-';
		res += formatdigits(dt.getDate());
		res += ' ';
		res += formatdigits(dt.getHours());
		res += ':';
		res += formatdigits(dt.getMinutes());
		res += ':';
		res += formatdigits(dt.getSeconds());
		return res;
	},

	getdate: function (dt) {
		var res = '';
		res += formatdigits(dt.getFullYear());
		res += '-';
		res += formatdigits(dt.getMonth() + 1);
		res += '-';
		res += formatdigits(dt.getDate());

		return res;
	},
};

const formatdigits = (val) => {
	val = val.toString();
	return val.length == 1 ? '0' + val : val;
};
