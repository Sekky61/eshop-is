import { UpdateCustomerInput } from "@/generated/graphql";
import { UserDetails } from "./UserContext";

export function merchNameToPath(merchName: string, merchId: string): string {
    let name = merchName.toLowerCase();
    return `/merch/${name}/${merchId}`;
}

// compare user information and updated information
// return changed fields
export function userInfoDiff(user: UserDetails, updated: any): UpdateCustomerInput | null {

    if (user.customerInfo == null || user.accountInfo == null) {
        return null;
    }

    let diff: UpdateCustomerInput = {};

    if (user.customerInfo.firstName != updated.firstName) {
        diff.firstName = updated.firstName;
    }

    if (user.customerInfo.lastName != updated.lastName) {
        diff.lastName = updated.lastName;
    }

    if (user.customerInfo.phoneNumber != updated.phoneNumber) {
        diff.phoneNumber = updated.phoneNumber;
    }

    if (user.customerInfo.address?.city != updated.city) {
        if (diff.address == null) {
            diff.address = user.customerInfo.address;
        }

        diff.address!.city = updated.city;
    }

    if (user.customerInfo.address?.state != updated.state) {
        if (diff.address == null) {
            diff.address = user.customerInfo.address;
        }

        diff.address!.state = updated.state;
    }

    if (user.customerInfo.address?.street != updated.street) {

        if (diff.address == null) {
            diff.address = user.customerInfo.address;
        }

        diff.address!.street = updated.street;
    }

    if (user.customerInfo.address?.postalCode != updated.postalCode) {
        if (diff.address == null) {
            diff.address = user.customerInfo.address;
        }

        diff.address!.postalCode = updated.postalCode;
    }

    // payment

    if (user.customerInfo.paymentInformation == null) {
        if (updated.cardNumber != "" || updated.ccv != "" || updated.expirationDate != "" || updated.cardHolderName != "") {
            diff.paymentInformation = {
                cardNumber: updated.cardNumber,
                ccv: updated.ccv,
                expirationDate: updated.expirationDate,
                cardHolderName: updated.cardHolderName
            }
        }
    }

    return diff;
}
