import { Flex } from "antd";
import { Navigate } from "react-router-dom"
import './ErrorPage.scss'
import { useSelector } from "react-redux";
import { errorCodeSelector } from "src/entities/global";
import { links } from "src/shared/utils/global";

export function ErrorPage() {
    const code = useSelector(errorCodeSelector) ?? 500;

    if (!code) {
        return <Navigate to={links.base} />
    }

    return (
        <Flex className="page__error" align="center" justify="center">
            <img src={`https://http.cat/${code}.jpg`} />
        </Flex>
    )
}
