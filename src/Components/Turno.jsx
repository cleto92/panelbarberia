/* eslint-disable react/prop-types */

const Turno = ({ turno, horario }) => {
  const [cliente] = turno;
  const [reserva] = horario;

  const formatearFechaHora = (reserva) => {
    const dia = reserva.dia;
    const hora = reserva.hora;

    const fecha = new Date(reserva.fecha);
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaFormateada = fecha.toLocaleDateString("es-AR", opciones);

    return `${dia}, ${fechaFormateada}, ${hora}`;
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
      <td className="py-4 px-6">{cliente?.nombre}</td>
      <td className="py-4 px-6">{cliente?.apellido}</td>
      <td className="py-4 px-6">{cliente?.email}</td>
      <td className="py-4 px-6">{cliente?.telefono}</td>
      <td className="py-4 px-6">
        {reserva ? formatearFechaHora(reserva) : ""}
      </td>
      <td className="py-4 px-6">{cliente?.pago}</td>
    </tr>
  );
};

export default Turno;
