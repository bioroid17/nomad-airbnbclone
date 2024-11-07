import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <h1>Upload room</h1>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
