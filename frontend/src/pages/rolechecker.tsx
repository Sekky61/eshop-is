import ClientOnly from "@/common/fetch/ClientOnly"
import { RoleChecker } from "@/components/RoleChecker"

const RoleCheck = () => {
    return (
        <ClientOnly>
            <RoleChecker></RoleChecker>
        </ClientOnly>
    )
}

export default RoleCheck