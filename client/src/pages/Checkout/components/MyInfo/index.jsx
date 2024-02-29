import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { FormattedMessage } from "react-intl"

const MyInfo = ({ province, handleGetCity, city, setService, service, handleGetService, handleData }) => {
    console.log(service?.cost)
    return (
        <>
            <Box>
                <TextField onChange={(e)=>handleData(e.target.value, 'name')} required sx={{ width:'40%', m: 1 }} label={<FormattedMessage id="name"/>} variant="outlined" />
                <TextField onChange={(e)=>handleData(e.target.value, 'contact')} required sx={{ width:'40%', m: 1 }} label={<FormattedMessage id="contact"/>} variant="outlined" />
                <TextField  onChange={(e)=>handleData(e.target.value, 'address')} required sx={{ width:'82%', m: 1 }} label={<FormattedMessage id="address"/>} variant="outlined" />
                <FormControl sx={{ minWidth: '82%', m: 1 }}>
                    <InputLabel id="province"><FormattedMessage id="province"/></InputLabel>
                        <Select
                            required 
                            labelId="province"
                            label="province"
                            onChange={(e) => {handleGetCity(e)}}
                        >
                            <MenuItem value="" disabled>
                                <em><FormattedMessage id="province"/></em>
                            </MenuItem>
                            {
                                province?.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={`${value?.province_id},${value?.province}`}>{value?.province}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                </FormControl>
                <FormControl sx={{ minWidth: '82%', m: 1 }}>
                    <InputLabel id="city"><FormattedMessage id="city"/></InputLabel>
                        <Select
                            required
                            labelId="city"
                            label="city"
                            onChange={(e)=>{setService({...service, city_id: e.target.value?.split(',')[0]}); handleData(e.target.value?.split(',')[1], 'city')}}
                        >
                            <MenuItem value="" disabled>
                                <em><FormattedMessage id="city"/></em>
                            </MenuItem>
                            {
                                city?.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={`${value?.city_id},${value?.city_name}`}>{value?.city_name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                </FormControl>
                <FormControl sx={{ minWidth: '82%', m: 1 }}>
                    <InputLabel id="courier"><FormattedMessage id="courier"/></InputLabel>
                        <Select
                            required
                            labelId="courier"
                            label="courier"
                            onChange={handleGetService}
                        >
                            <MenuItem value="" disabled>
                                <em><FormattedMessage id="choose_courier"/></em>
                            </MenuItem>
                            <MenuItem value={'jne'}>JNE</MenuItem>
                            <MenuItem value={'tiki'}>TIKI</MenuItem>
                            <MenuItem value={'pos'}>POS</MenuItem>
                        </Select>
                </FormControl>
                {
                    service?.cost?.length === 0 ?
                    null
                    :
                    <FormControl sx={{ minWidth: '82%', m: 1 }}>
                        <InputLabel id="service"><FormattedMessage id="service"/></InputLabel>
                            <Select
                                required
                                labelId="service"
                                label="service"
                                onChange={(e) => {handleData(e.target.value?.split(',')[0], 'service');handleData(e.target.value?.split(',')[1], 'cost')}}
                            >
                                <MenuItem value="" disabled>
                                    <em><FormattedMessage id="service"/></em>
                                </MenuItem>
                                {
                                    service?.cost?.map((value,index) => {
                                        return (
                                            <MenuItem value={`${value?.service},${value?.cost[0]?.value}`}>{value?.service} ({value?.cost[0]?.etd} Day)</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
                }
            </Box>
        </>
    )
}

export default MyInfo