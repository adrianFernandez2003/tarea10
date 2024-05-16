import { Table } from "antd";
import { useEffect, useState } from "react";
import { Session } from "../models/session";
import { createSesionProducto, getSessions } from "../services/session";
import { Button, Drawer, Form, Input, DatePicker } from 'antd';
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';
import moment from 'moment'; // Importa moment.js

const SessionsTable: React.FC = () => {
	const [sessions, setSessions] = useState<Session[]>([]);
  const [open, setOpen] = useState(false);
  const [fechasesion, setFechaSesion] = useState<moment.Moment>(moment()); // Usa moment.Moment para el estado de la fecha
  const [horasesion, setHoraSesion] = useState<moment.Moment>(moment()); // Usa moment.Moment para el estado de la hora
  const [fechaventa, setFechaVenta] = useState<moment.Moment>(moment());

  const showDrawer = () => {
    setOpen(true);
  };
  const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onClose = () => {
    setOpen(false);
  };

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const users = await getSessions();
				setSessions(users);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID sesion',
            dataIndex: 'idsesion',
            key: 'idsesion'
          },
          {
            title: 'fecha sesion',
            dataIndex: 'fechasesion',
            key: 'fechasesion'
          },
          {
            title: 'hora sesion',
            dataIndex: 'horasesion',
            key: 'horasesion'
          },
          {
            title: 'id cliente',
            dataIndex: 'fk_cliente',
            key: 'fk_cliente'
          },
          {
            title: 'fecha de venta',
            dataIndex: 'fechaventa',
            key: 'fechaventa'
          },
          {
            title: 'fecha creacion',
            dataIndex: 'fechacreacion',
            key: 'fechacreacion'
          },
          {
            title: 'fecha actualizacion',
            dataIndex: 'fechaactualizacion',
            key: 'fechaactualizacion'
          },
          {
            title: 'creado por',
            dataIndex: 'fk_creadopor',
            key: 'fk_creadopor'
          },
          {
            title: 'actualizado por',
            dataIndex: 'fk_actualizadopor',
            key: 'fk_actualizadopor'
          },
          {
            title: 'fecha de eliminacion',
            dataIndex: 'fechaeliminacion',
            key: 'fechaeliminacion'
          },
          {
            title: 'eliminado por',
            dataIndex: 'fk_eliminadopor',
            key: 'fk_eliminadopor'
          },
	];
  const handleSubmit = async () => {
    try {
      const currentDateTime = moment();
      
      // Consultar el ID máximo actual en la tabla sesiones
      const maxIdResponse = await supabase
        .from("sesiones")
        .select("idsesion")
        .order("idsesion", { ascending: false })
        .limit(1);
    
      const maxId = maxIdResponse.data?.[0]?.idsesion || 0;
      const newId = maxId + 1;
    
      // Formatear las fechas y horas como strings antes de enviarlas a la base de datos
      const categoryInput: Session = {
        idsesion: newId,
        fechasesion: fechasesion.format('YYYY-MM-DD'),
        horasesion: horasesion.format('HH:mm:ss'),
        fechaventa: fechaventa.format('YYYY-MM-DD'),
        fechacreacion: currentDateTime.format('YYYY-MM-DD HH:mm:ss')
      };
    
      // Insertar el nuevo registro en la base de datos
      await createSesionProducto(categoryInput);
    
      // Actualizar la lista de sesiones después de la inserción
      const updatedSessions = await getSessions();
      setSessions(updatedSessions);
      onClose();
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
	return (
		<>
          <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
      <Form>
          <Form.Item label='fecha de sesion' name='fechasesion' rules={[{ required: true, message: 'Ingrese una fecha' }]}>
          <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item label='hora de sesion' name='horasesion' rules={[{ required: true, message: 'Ingrese una hora de sesion' }]}>
          <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item label='fecha de venta' name='fechaventa' rules={[{ required: true, message: 'Ingrese una fecha de venta' }]}>
          <DatePicker onChange={onChange} />
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={sessions} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default SessionsTable;