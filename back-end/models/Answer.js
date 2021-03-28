module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define("Answer", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(64),
			allowNull: false,
		  },
		comment: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Answer;
};