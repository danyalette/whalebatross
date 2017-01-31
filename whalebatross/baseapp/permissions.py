from rest_framework import permissions

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
MOD_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH']

class IsAdminOrOwnerOrNoMod(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if (request.method in MOD_METHODS):
            return ((request.user and request.user.is_superuser)
                or obj.author == request.user)
        return True

class IsStaffOrNoCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if (request.method == 'POST'):
            return request.user.is_staff
        return True

class IstaffOrNoMod(permissions.BasePermission):
    def has_permission(self, request, view):
        if (request.method in MOD_METHODS):
            return request.user.is_staff
        return True
