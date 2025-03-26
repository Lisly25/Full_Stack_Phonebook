const PersonForm = (props) => {

	return (
		<div>
      	<form id="PersonForm" onSubmit={props.addNew}>
        <div>
        	name: <input id="NameInput" value={props.name} onChange={props.newNameEventHandler} />
        </div>
        <div>
        	number: <input id="NumberInput" value={props.phoneNumber} onChange={props.newPhoneNumberEventHandler}/>
        </div>
        <div>
        	<button id="NewContactSubmit" type="submit">add</button>
        </div>
      	</form>
		</div>
	)
}

export default PersonForm;