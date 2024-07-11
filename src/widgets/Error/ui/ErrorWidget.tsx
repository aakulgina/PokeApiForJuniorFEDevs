import { Navigate, useRouteError } from "react-router-dom";
import { useAppDispatch } from "src/app/store";
import { saveErrorCode } from "src/entities/global";
import { links } from "src/shared/utils/global";

export function ErrorWidget() {
    const error = useRouteError();
    const dispatch = useAppDispatch()
    
    if (error) {
        const errorCode = Number((error as Record<string, unknown>).status ?? 500)
        dispatch(saveErrorCode(errorCode))

        return <Navigate to={links.failure(errorCode)} replace />
    }

    return <Navigate to={links.base} />
}
