import { getToken } from '@/utils/storage'
export default function ProtectedRoute({ children }: any) {

    return getToken() ? children : <div>You must login first.</div>;
}
