import { IsString } from "class-validator";
import { EventDocumentDto } from "./event-document.dto";


export class EventDocumentLargeDto extends EventDocumentDto {
    @IsString()
    public fileContentType: string;

    @IsString()
    public fileName: string;
}