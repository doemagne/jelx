
const AccountControls = (props) => {
    return (
        <div className='row'>
            <div className='col'>
                <button type='button' className='btn btn-default btn-primary' onClick={props.fieldEditHandler}>
                    <span className='bi bi-gear' />
                </button>
            </div>
            <div className='col'>
                <button type='button' className='btn btn-default btn-secondary'>
                    <span className='bi bi-key' />
                </button>
            </div>
            <div className='col'>
                <button type='button' className='btn btn-default btn-danger'>
                    <span className='bi bi-file-pdf-fill' />
                </button>
            </div>
            {!props.fieldEdit && <div className='col'>
                <button type='button' className='btn btn-default btn-success'>
                    <span className='bi bi-cloud-arrow-up-fill' />
                </button>
            </div>}
        </div>
    );
}

export default AccountControls;