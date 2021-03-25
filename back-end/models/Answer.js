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
			unique: true,
		  },
		comment: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	return Answer;
};