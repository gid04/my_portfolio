import UploadForm from '../components/admin/UploadForm';

const Upload = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Upload New Project</h1>
            <div style={{ padding: '2rem', marginTop: '1rem', maxWidth: '700px', margin: '0 auto', border: '1px solid #eee' }}>
                <UploadForm />
            </div>
        </div>
    );
};

export default Upload;
