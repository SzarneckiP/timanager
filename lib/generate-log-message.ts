import { ACTION, AuditLog } from '@prisma/client'

export const generateLogMessage = (log: AuditLog) => {
    const { action, entityType, entityTitle } = log

    switch (action) {
        case ACTION.CREATE:
            return `dodał ${entityType.toLocaleLowerCase().slice(0, -1)}ę "${entityTitle}"`
        case ACTION.UPDATE:
            return `zaktualizował ${entityType.toLocaleLowerCase().slice(0, -1)}ę "${entityTitle}"`
        case ACTION.DELETE:
            return `usunął ${entityType.toLocaleLowerCase().slice(0, -1)}ę "${entityTitle}"`
        default:
            return `nieznana akcja ${entityType.toLocaleLowerCase()} "${entityTitle}"`
    }
}