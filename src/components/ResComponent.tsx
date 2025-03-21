interface props {
  jsonresponse: string[];
}

const ResComponent = ({ jsonresponse }: props) => {
  const data = jsonresponse;

  console.log(data);

  return (
    <div>
      {jsonresponse.map((data) => (
        <p key={data[0]}>{data[0]}</p>
      ))}
    </div>
  );
};

export default ResComponent;
