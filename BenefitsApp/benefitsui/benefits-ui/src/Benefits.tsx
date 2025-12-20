import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

interface BenefitsData {
    employeeBenefitsYearlyCost?: number;
    dependentBenefitsYearlyCost?: number;
    salary?: number;
}

interface BenefitsProps {
    benefits?: BenefitsData | string;
}

export const Benefits = ({ benefits = '' }: BenefitsProps) => {
    // Handle case where benefits might be a string or object
    const benefitsData: BenefitsData = typeof benefits === 'string' ? {} : (benefits || {});

    return (
        <>
            <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Benefits Information
                    </Typography>
                    <Box>
                        <Box sx={{ padding: 1.5 }}>
                            <Typography variant="body1" component="div">
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                    Employee Cost Per Year:
                                </Typography>
                                <Typography component="span" sx={{ marginLeft: 1 }}>
                                    ${benefitsData.employeeBenefitsYearlyCost || '0.00'}
                                </Typography>
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ padding: 1.5 }}>
                            <Typography variant="body1" component="div">
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                    Dependents Cost Per Year:
                                </Typography>
                                <Typography component="span" sx={{ marginLeft: 1 }}>
                                    ${benefitsData.dependentBenefitsYearlyCost || '0.00'}
                                </Typography>
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ padding: 1.5 }}>
                            <Typography variant="body1" component="div">
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                    Employee Yearly Salary:
                                </Typography>
                                <Typography component="span" sx={{ marginLeft: 1 }}>
                                    ${benefitsData.salary || '0.00'}
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

