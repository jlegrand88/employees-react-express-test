const employeesData = require('../data/employees-data.json');

const getAllEmployees = async (req, res) => {
  try {
    res.json(employeesData);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = employeesData.find(emp => emp.id === id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el detalle' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById
};