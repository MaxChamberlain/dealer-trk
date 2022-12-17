import { useState, useEffect } from 'react'
import { getDocumentsByCompanyId } from '../../../utils/api'

export const useDocs = async () => {
    const [docs, setDocs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
    }, [])

    return docs
}
