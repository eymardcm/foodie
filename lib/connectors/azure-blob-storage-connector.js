import { BlobServiceClient } from '@azure/storage-blob'
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)


export async function storeBlob(containerName, fileName, image) {
    const container = containerName
    const containerClient = blobServiceClient.getContainerClient(container)
    
    const blobName = fileName
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    const bufferedImage = await image.arrayBuffer()


    try {
        await blockBlobClient.upload(bufferedImage, bufferedImage.byteLength)
        return { error: false }
    } catch (error) {
        console.error(error)
        return { error: true }
        
    }
}

