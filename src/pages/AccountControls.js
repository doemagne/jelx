
const AccountControls = (props) => {
    return (
        <div className='row'>
            <div className='col'>
                <button type='button' className='btn btn-default btn-primary' onClick={props.fieldEditHandler}>
                    <span className='bi bi-gear' />
                </button>
            </div>
            <div className='col'>
                <button type='button' className='btn btn-default btn-secondary' onClick={props.togglePasswordChangeHandler}>
                    <span className='bi bi-key' />
                </button>
            </div>
            <div className='col'>
                <button type='button' className='btn btn-default btn-danger'>
                    <span className='bi bi-file-pdf-fill' />
                </button>
            </div>
            {!props.fieldEdit && <div className='col'>
                <button onClick={props.onSubmitUpdate} type='button' className='btn btn-default btn-success'>
                    <span className='bi bi-cloud-arrow-up-fill' />
                </button>
            </div>}
            {props.passwordToggle && <div className='col'>
                <button type='button' className='btn btn-default btn-secondary' onClick={props.submitCredentialHandler}>
                    <span className='bi bi-lock' />
                </button>
            </div>}
        </div>
    );
}

export default AccountControls;