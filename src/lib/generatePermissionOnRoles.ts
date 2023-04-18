const generatePermissionOnRoles = (permissions: string[], role: string) => {
    return permissions.map(permission => ({ role_id: role, permission_id: permission}))
}

export default generatePermissionOnRoles